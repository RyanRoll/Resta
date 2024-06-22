import React, {
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect,
} from 'react'
import {
  Drawer,
  Flex,
  Button,
  Select,
  DatePicker,
  InputNumber,
  FloatButton,
  Space,
  Switch,
} from 'antd'
import type { DatePickerProps } from 'antd'
import {
  ReloadOutlined,
  FileSearchOutlined,
  EditOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { debounce } from 'lodash'

import {
  DATE_FORMAT_DATE,
  DATE_FORMAT_DATETIME_UI,
  toCurrencyNumber,
} from 'src/libs/common'
import { MEMO_OPTIONS } from 'src/constants/defaults/memos'
import { useOrderList } from './hooks'
import { AppContext } from 'src/components/App/context'
import { Keyboard } from 'src/components/Keyboard'
import * as styles from './styles'

const { RangePicker } = DatePicker

export const OrderList: React.FC<{}> = () => {
  const [dates, setDates] = useState<Dayjs[]>()
  const [searchData, setSearchData] = useState<string[]>([])
  const [orderTotal, setOrderTotal] = useState<number>(0)
  const [turnoverSum, setTurnoverSum] = useState<number>(0)
  const [ordersSum, setOrdersSum] = useState<number>(0)
  const [isSearchOpen, setSearchDrawer] = useState(false)
  const [isKeyboardOpen, setKeyboardDrawer] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [dateOrder, setDateOrder] = useState(true) // true is desc date order
  const { appEvent } = useContext(AppContext)

  const todayDate = dayjs.tz()
  const todayStartDate = todayDate.startOf('day')
  const todayEndDate = todayDate.endOf('day')
  const yesterStartDate = todayStartDate.add(-1, 'd')
  const isDisabled = !dates?.length

  const openSearchDrawer = useCallback(() => {
    setSearchDrawer(true)
  }, [])
  const closeSearchDrawer = useCallback(() => {
    setSearchDrawer(false)
  }, [])
  const openKeyboardDrawer = useCallback(() => {
    document.body.classList.add('resta--hidden-scroll')
    setKeyboardDrawer(true)
  }, [])
  const closeKeyboardDrawer = useCallback(() => {
    document.body.classList.remove('resta--hidden-scroll')
    setKeyboardDrawer(false)
    appEvent.fire(appEvent.ORDER_AFTER_ACTION)
  }, [appEvent])
  const onRangeChange = useCallback((dates: null | (Dayjs | null)[]) => {
    if (dates) {
      const [start, end] = dates
      setDates([start, end.endOf('day')])
    }
  }, [])
  const onChangesearchData = useCallback(
    debounce((value: typeof searchData) => {
      setSearchData(value)
    }, 300),
    [],
  )
  const onChangeOrderTotal = useCallback(
    debounce((value: number) => {
      setOrderTotal(value)
    }, 500),
    [],
  )
  const onChangeTurnoverSum = useCallback(
    debounce((value: number) => {
      setTurnoverSum(value)
    }),
    [],
  )
  const onChangeOrdersSum = useCallback(
    debounce((value: number) => {
      setOrdersSum(value)
    }),
    [],
  )
  const onSetShowTime = useCallback(() => {
    setShowTime(status => !status)
  }, [])
  const onToggleDateOrder = useCallback(() => {
    setDateOrder(dateOrder => !dateOrder)
  }, [])
  const disabled1MonthDate: DatePickerProps['disabledDate'] = (
    current,
    { from },
  ) => {
    if (from) {
      return Math.abs(current.diff(from, 'month')) >= 1
    }

    return false
  }
  const reset = useCallback(() => {
    setDates([])
    setSearchData([])
    setOrderTotal(0)
    setTurnoverSum(0)
    setOrdersSum(0)
  }, [])
  const dateGroup = useRef<{
    [dayStart: string]: {
      ordersSum: number
      total: number
    }
  }>({})
  const handleRecords: Resta.OrderList.HandleRecords = useCallback(
    records => {
      dateGroup.current = {}
      return records
        .filter(({ total, createdAt }) => {
          const dayStart = dayjs.tz(createdAt).format(DATE_FORMAT_DATE)
          const group = (dateGroup.current[dayStart] = dateGroup.current[
            dayStart
          ] ?? {
            ordersSum: 0,
            total: 0,
          })
          group.total += total
          ++group.ordersSum
          if (orderTotal) {
            if (orderTotal && total < orderTotal) {
              return false
            }
          }
          return true
        })
        .filter(({ createdAt }) => {
          if (turnoverSum || ordersSum) {
            const dayStart = dayjs.tz(createdAt).format(DATE_FORMAT_DATE)
            const group = dateGroup.current[dayStart]
            if (group) {
              if (turnoverSum && group.total < turnoverSum) {
                return false
              }
              if (ordersSum && group.ordersSum < ordersSum) {
                return false
              }
            }
          }
          return true
        })
    },
    [orderTotal, turnoverSum, ordersSum],
  )

  const {
    periodsOrder,
    orderListElement,
    anchorElement,
    summaryElement,
    callOrderAPI,
  } = useOrderList({
    datetime: dates?.length ? dates.map(date => date.valueOf()) : 'today',
    searchData,
    dateOrder,
    searchUI: false,
    reverse: false,
    handleRecords,
  })

  useEffect(() => {
    const off = appEvent.on(
      appEvent.KEYBOARD_ON_ACTION,
      (
        event: Resta.AppEventObject<Resta.AppEvent.KEYBOARD_ON_ACTION.Detail>,
      ) => {
        const { action } = event.detail
        action === 'edit' && openKeyboardDrawer()
      },
    )
    return () => off()
  }, [appEvent, openKeyboardDrawer])

  const periodsLength = periodsOrder.length
  return (
    <Flex css={styles.mainCss} gap="middle" vertical>
      <Drawer
        css={styles.drawerCss}
        title={
          <>
            <Button icon={<ReloadOutlined />} type="text" onClick={reset}>
              重設
            </Button>
          </>
        }
        getContainer={false}
        placement="left"
        open={isSearchOpen}
        mask={true}
        onClose={closeSearchDrawer}
      >
        <Flex vertical gap="large">
          <Flex vertical gap="large">
            <h2>日期</h2>
            <RangePicker
              showNow
              presets={[
                {
                  label: '今天',
                  value: [todayStartDate, todayEndDate],
                },
                {
                  label: '昨天',
                  value: [yesterStartDate, yesterStartDate.endOf('day')],
                },
                {
                  label: '今天 - 昨天',
                  value: [yesterStartDate, todayEndDate],
                },
                {
                  label: '7天前',
                  value: [todayStartDate.add(-7, 'd'), todayEndDate],
                },
                {
                  label: '14天前',
                  value: [todayStartDate.add(-14, 'd'), todayEndDate],
                },
                {
                  label: '1個月前',
                  value: [todayStartDate.add(-30, 'd'), todayEndDate],
                },
              ]}
              showTime={showTime}
              format={DATE_FORMAT_DATETIME_UI}
              placeholder={['開始日期', '結束日期']}
              size="large"
              // @ts-expect-error expected
              value={dates}
              disabledDate={disabled1MonthDate}
              onChange={onRangeChange}
              renderExtraFooter={() => (
                <Button
                  css={styles.toggleTimeBtnCss}
                  type="text"
                  onClick={onSetShowTime}
                >
                  {showTime ? '關閉時間' : '指定時間'}
                </Button>
              )}
            />
          </Flex>
          <Flex vertical gap="large">
            <h2>關鍵字</h2>
            <Select
              placeholder="找什麼呢?"
              mode="tags"
              size="large"
              style={{ width: '100%' }}
              allowClear
              onKeyUp={event => {
                event.preventDefault()
                event.stopPropagation()
              }}
              options={MEMO_OPTIONS}
              disabled={isDisabled}
              value={searchData}
              onChange={onChangesearchData}
            />
          </Flex>
          <Flex vertical gap="large">
            <h2>日期排序</h2>
            <Switch
              checkedChildren="反序"
              unCheckedChildren="正序"
              defaultChecked
              onChange={onToggleDateOrder}
            />
          </Flex>
          <Flex vertical gap="large">
            <h2>單筆金額大於</h2>
            <InputNumber
              size="large"
              prefix="$"
              style={{ width: '60%' }}
              formatter={toCurrencyNumber}
              disabled={isDisabled}
              value={orderTotal}
              onChange={onChangeOrderTotal}
            />
          </Flex>
          <Flex vertical gap="large">
            <h2>當日營業額大於</h2>
            <InputNumber
              size="large"
              prefix="$"
              style={{ width: '60%' }}
              formatter={toCurrencyNumber}
              disabled={isDisabled}
              value={turnoverSum}
              onChange={onChangeTurnoverSum}
            />
          </Flex>
          <Flex vertical gap="large">
            <h2>當日訂單數量大於</h2>
            <InputNumber
              size="large"
              style={{ width: '60%' }}
              formatter={toCurrencyNumber}
              disabled={isDisabled}
              value={ordersSum}
              onChange={onChangeOrdersSum}
            />
          </Flex>
        </Flex>
      </Drawer>
      <Drawer
        css={[styles.drawerCss, styles.keyboardDrawerCss]}
        title={
          <Space>
            <EditOutlined />
            <label>編輯訂單</label>
          </Space>
        }
        getContainer={false}
        placement="right"
        open={isKeyboardOpen}
        mask={true}
        onClose={closeKeyboardDrawer}
        width={820}
        forceRender={true}
      >
        <Keyboard
          drawerMode
          callOrderAPI={callOrderAPI}
          submitCallback={closeKeyboardDrawer}
        />
      </Drawer>
      <div
        css={[
          styles.contentCss,
          (isSearchOpen || isKeyboardOpen) && styles.drawerAcitve,
        ]}
      >
        {anchorElement}
        <div css={styles.headerCss}>
          <Space size={60}>
            <Button
              css={styles.searchBtnCss}
              type="text"
              icon={<FileSearchOutlined />}
              onClick={openSearchDrawer}
            >
              訂單搜尋
            </Button>
            {!!periodsLength && (
              <h2>
                {periodsLength === 1
                  ? periodsOrder[0]
                  : [periodsOrder[0], periodsOrder.at(-1) ?? ''].join(' ~ ')}
              </h2>
            )}
          </Space>
          {summaryElement}
        </div>
        <Flex wrap>{orderListElement}</Flex>
      </div>
      <FloatButton.BackTop visibilityHeight={100} />
    </Flex>
  )
}

export default OrderList
