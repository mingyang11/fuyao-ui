import { DatePickerProps } from 'antd/es/date-picker';
import { TimePickerProps } from 'antd/es/time-picker';
import { Dayjs } from 'dayjs';
import React from 'react';
type Range = {
    value: number;
    unit: 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';
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
    onChange?: (dates: [Dayjs | undefined | null, Dayjs | undefined | null] | undefined, dateStrings: [string | undefined, string | undefined] | undefined) => void;
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
} & Omit<DatePickerProps, 'picker' | 'value' | 'defaultValue' | 'onChange' | 'disabledDate' | 'placeholder' | 'format'> & Omit<TimePickerProps, 'value' | 'defaultValue' | 'onChange' | 'disabledDate' | 'placeholder' | 'format'>;
declare const FuyaoRangePicker: React.FC<FuyaoRangePickerProps>;
export default FuyaoRangePicker;
