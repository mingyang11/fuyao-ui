import { DatePickerProps } from 'antd/es/date-picker';
import { TimePickerProps } from 'antd/es/time-picker';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import DatePicker from 'antd/es/date-picker';
import TimePicker from 'antd/es/time-picker';

type Range = {
  value: number;
  unit:
    | 'year'
    | 'quarter'
    | 'month'
    | 'week'
    | 'day'
    | 'hour'
    | 'minute'
    | 'second';
};

export type FuyaoRangePickerProps = {
  /**
   * 选择呈现的模式，默认值： "date"
   */
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year' | 'time';
  /**
   * 允许内容为空，默认值： [false, false]
   */
  allowEmpty?: [boolean, boolean] | true;
  /**
   * 中间的连接字符，默认值： "-"
   */
  separator?: string;
  /**
   * 分割线间距，默认值： 6
   */
  margin?: number;
  /**
   * 始末时间是否按大小自动排序，默认值： true
   */
  order?: boolean;
  /**
   * 取值
   */
  value?: [Dayjs | undefined, Dayjs | undefined];
  /**
   * 默认取值
   */
  defaultValue?: [Dayjs | undefined, Dayjs | undefined];
  /**
   * 值改变的回调函数
   */
  onChange?: (
    dates: [Dayjs | undefined | null, Dayjs | undefined | null] | undefined,
    dateStrings: [string | undefined, string | undefined] | undefined
  ) => void;
  /**
   * 不可选日期
   * @param date
   * @param type
   */
  disabledDate?: (date: Dayjs, type: 'start' | 'end') => boolean;
  /**
   * 占位符
   */
  placeholder?: string | [string, string];
  /**
   * 时间最大跨度
   */
  maxRange?: Range | Range['unit'];
  /**
   * 格式化方式，参照dayjs的格式化字符
   */
  format?: string | ((value: Dayjs) => string);
} & Omit<
  DatePickerProps,
  | 'picker'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'disabledDate'
  | 'placeholder'
  | 'format'
> &
  Omit<
    TimePickerProps,
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'disabledDate'
    | 'placeholder'
    | 'format'
  >;

type Empty<T> = T | null | undefined;

const FuyaoRangePicker: React.FC<FuyaoRangePickerProps> = (props) => {
  const {
    picker = 'date',
    allowEmpty = [false, false],
    separator = '-',
    margin = 6,
    order = true,
    defaultValue,
    value,
    onChange,
    disabledDate,
    maxRange,
    placeholder,
    className,
    style,
    ...others
  } = props;

  const [valueState, setValueState] =
    useState<Empty<[Empty<Dayjs>, Empty<Dayjs>]>>(defaultValue);
  const [tempValue, setTempValue] =
    useState<Empty<[Empty<Dayjs>, Empty<Dayjs>]>>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const valueStringRef =
    useRef<Empty<[Empty<string>, Empty<string>]>>(undefined);

  useEffect(() => {
    const defaultFormats = {
      year: 'YYYY',
      quarter: 'YYYY-[Q]Q',
      month: 'YYYY-MM',
      week: 'YYYY-[w]w',
      date: 'YYYY-MM-DD',
      time: 'HH:mm:ss',
    };
    const format = props.format || defaultFormats[picker];

    // 初始化 valueString
    const initialValue = 'value' in props ? props.value : defaultValue;
    if (initialValue) {
      valueStringRef.current = initialValue.map((date) => {
        if (!date) return undefined;
        if (typeof format === 'function') {
          return format(date);
        }
        return date.format(format);
      }) as [string | undefined, string | undefined];
    }
  }, []);

  // 获取开始时间
  const getStart = (): Empty<Dayjs> => {
    if (tempValue) {
      return tempValue[0];
    }
    if ('value' in props) {
      return props.value?.[0];
    }
    return valueState?.[0];
  };

  // 获取结束时间
  const getEnd = (): Empty<Dayjs> => {
    if (tempValue) {
      return tempValue[1];
    }
    if ('value' in props) {
      return props.value?.[1];
    }
    return valueState?.[1];
  };

  // 获取占位符
  const getPlaceholders = (): [string, string] => {
    if (placeholder) {
      return Array.isArray(placeholder)
        ? placeholder
        : [placeholder, placeholder];
    }

    return ['开始', '结束'].map(
      (str) =>
        (str +=
          {
            time: '时间',
            date: '日期',
            week: '周数',
            month: '月份',
            quarter: '季度',
            year: '年份',
          }[picker] || '日期')
    ) as [string, string];
  };

  // 处理值变化
  const handleValueChange =
    (type: 'start' | 'end') => (date: Dayjs | null, dateString: string) => {
      const [startEmpty = false, endEmpty = false] =
        allowEmpty === true ? [true, true] : (allowEmpty ?? []);
      const start = getStart();
      const end = getEnd();
      const valueString = valueStringRef.current || [];

      // 时间组合值
      let newValue: [Dayjs | null | undefined, Dayjs | null | undefined] =
        type === 'start' ? [date, end] : [start, date];

      // 更新值字符串
      const newValueString: [string | undefined, string | undefined] =
        type === 'start'
          ? [dateString, valueString[1]]
          : [valueString[0], dateString];

      valueStringRef.current = newValueString;

      // 时间类型自动排序起止值
      if (
        picker === 'time' &&
        order &&
        newValue.every((d) => d !== null && d !== undefined) &&
        newValue[0]! > newValue[1]!
      ) {
        newValue = [newValue[1], newValue[0]];
        valueStringRef.current = [newValueString[1], newValueString[0]];
      }

      // 不允许为空但值为空，或者起止都为空时，清空值
      if (
        (date === null && !startEmpty && type === 'start') ||
        (date === null && !endEmpty && type === 'end') ||
        newValue.every((d) => d === null)
      ) {
        newValue = [undefined, undefined];
        valueStringRef.current = undefined;
      }

      // 不允许为空，但起止有一个为空，则缓存值
      if (
        newValue[0] !== undefined &&
        newValue[1] !== undefined &&
        ((!startEmpty && !newValue[0]) || (!endEmpty && !newValue[1]))
      ) {
        setTempValue(newValue as [Empty<Dayjs>, Empty<Dayjs>]);
        return;
      }

      // 需要重置缓存
      if (tempValue) {
        setTempValue(undefined);
      }

      // 更新内部状态
      if (!('value' in props)) {
        setValueState(newValue as [Empty<Dayjs>, Empty<Dayjs>]);
      }

      // 触发外部回调
      onChange?.(newValue, valueStringRef.current);
    };

  // 处理聚焦
  const handleFocus = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // 处理失焦
  const handleBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (tempValue) {
        setTempValue(undefined);
      }
    }, 100);
  };

  // 获取其他属性
  const getOtherProps = (type: 'start' | 'end') => {
    // 处理禁用日期
    const isDisabledDate = (current: Dayjs) => {
      // 自定义不可选日期
      if (disabledDate && disabledDate(current, type)) {
        return true;
      }

      // 最大跨度控制
      if (maxRange) {
        const range: Range =
          typeof maxRange === 'string'
            ? { value: 1, unit: maxRange }
            : maxRange;

        const start = getStart();
        const end = getEnd();

        // 选择开始时间，限制结束时间
        if (type === 'end' && start) {
          const maxDate = dayjs(start).add(range.value, range.unit);
          return current.isAfter(maxDate);
        }

        // 选择结束时间，限制开始时间
        if (type === 'start' && end) {
          const minDate = dayjs(end).subtract(range.value, range.unit);
          return current.isBefore(minDate);
        }
      }

      return false;
    };

    return {
      placeholder: getPlaceholders()[type === 'start' ? 0 : 1],
      disabledDate: isDisabledDate,
      onFocus: handleFocus,
      onBlur: handleBlur,
    };
  };

  // 裁剪掉 antd 的 picker 属性（TimePicker 没有该属性）
  let pickerProps = {};
  if (picker !== 'time') {
    pickerProps = { picker };
  }

  // 样式设置
  const componentStyle = { margin: `0 ${margin}px` };
  const cls = classnames('fuyao-range', `fuyao-range-${picker}`, className);
  const separatorCls = classnames('fuyao-range-separator');

  // 根据 picker 选择不同组件
  if (picker === 'time') {
    return (
      <div className={cls} style={style}>
        <TimePicker
          className="fuyao-range-start"
          {...others}
          value={getStart()}
          onChange={handleValueChange('start')}
          {...getOtherProps('start')}
        />
        <span className={separatorCls} style={componentStyle}>
          {separator}
        </span>
        <TimePicker
          className="fuyao-range-end"
          {...others}
          value={getEnd()}
          onChange={handleValueChange('end')}
          {...getOtherProps('end')}
        />
      </div>
    );
  }

  return (
    <div className={cls} style={style}>
      <DatePicker
        className="fuyao-range-start"
        {...others}
        {...pickerProps}
        value={getStart()}
        onChange={handleValueChange('start')}
        {...getOtherProps('start')}
      />
      <span className={separatorCls} style={componentStyle}>
        {separator}
      </span>
      <DatePicker
        className="fuyao-range-end"
        {...others}
        {...pickerProps}
        value={getEnd()}
        onChange={handleValueChange('end')}
        {...getOtherProps('end')}
      />
    </div>
  );
};

export default FuyaoRangePicker;
