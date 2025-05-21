import { InputNumberProps } from 'antd/es/input-number';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';
import { useObjectState } from '../../utils/hooks';
import InputNumber from 'antd/es/input-number';
import { isEmpty } from '../../utils/helper';

export type FuyaoRangeInputProps = {
  /**
   * 允许起止位置为空
   */
  allowEmpty?: [boolean, boolean];
  /**
   * 分隔字符
   */
  separator?: string;
  /**
   * 输入框及分隔符之间的间隔
   */
  margin?: number;
  /**
   * 值
   */
  value?: [number | undefined, number | undefined];
  /**
   * 默认值
   */
  defaultValue?: [number | undefined, number | undefined];
  /**
   * 回调函数
   * @param value
   */
  onChange?: (value?: [number | undefined, number | undefined]) => void;
  /**
   * placeholder
   */
  placeholder?: string | [string, string];
} & Omit<
  InputNumberProps,
  'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'placeholder'
>;

const FuyaoRangeInput = (props: FuyaoRangeInputProps) => {
  const {
    autoFocus,
    defaultValue,
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
    value,
    onChange,
    className,
    style,
    separator = '-',
    allowEmpty = [false, false],
    margin = 6,
    id,
    placeholder = ['最小值', '最大值'],
    ...others
  } = props;

  const [p1, p2] = Array.isArray(placeholder)
    ? placeholder
    : [placeholder, placeholder];

  const [startAllowEmpty, endAllowEmpty] = useMemo(
    () => allowEmpty || [],
    [allowEmpty]
  );

  const getValue = useCallback((val?: any[]) => {
    const [start, end] = val || [];
    return { start, end };
  }, []);

  const [valObj, upValObj] = useObjectState<{
    start: number | undefined;
    end: number | undefined;
  }>(getValue(value || defaultValue));

  useEffect(() => {
    if ('value' in props) {
      upValObj(getValue(value));
    }
  }, [value, props, getValue, upValObj]);

  const handleChange = (type: 'start' | 'end') => (val: any) => {
    let { start, end } = valObj;
    const number = Number(val);
    // const needUpSelf = !('value' in props);
    const needUpSelf = true;
    if (Number.isNaN(number) || isEmpty(val)) {
      needUpSelf && upValObj({ [type]: undefined });
      type === 'start' ? (start = undefined) : (end = undefined);
    } else {
      needUpSelf && upValObj({ [type]: number });
      type === 'start' ? (start = number) : (end = number);
    }
    if (start === undefined && end === undefined) {
      onChange && onChange(undefined);
    } else if (start !== undefined && end !== undefined) {
      end >= start && onChange && onChange([start, end]);
    } else if (
      (startAllowEmpty && end !== undefined) ||
      (endAllowEmpty && start !== undefined)
    ) {
      onChange && onChange([start, end]);
    }
  };

  const focusRef = useRef<boolean>(false);

  const handleFocus = () => {
    focusRef.current = true;
  };

  const handleBlur = (type: 'start' | 'end') => () => {
    focusRef.current = false;
    setTimeout(() => {
      const { start, end } = valObj;
      if (!focusRef.current) {
        if (
          (!startAllowEmpty && start === undefined) ||
          (!endAllowEmpty && end === undefined) ||
          (start !== undefined && end !== undefined && start > end)
        ) {
          upValObj({
            start: undefined,
            end: undefined,
          });
          onChange && onChange(undefined);
        }
      }
    }, 50);
  };

  return (
    <div
      id={id}
      className={classnames('fuyao-range fuyao-range-input', className)}
      style={style}
    >
      <InputNumber
        className="fuyao-range-start"
        autoFocus={autoFocus}
        placeholder={p1}
        {...others}
        value={valObj.start}
        onChange={handleChange('start')}
        onBlur={handleBlur('start')}
        onFocus={handleFocus}
        min={min}
        max={max}
      />
      <span
        className="fuyao-range-separator"
        style={{ margin: `0 ${margin}px` }}
      >
        {separator}
      </span>
      <InputNumber
        className="fuyao-range-end"
        placeholder={p2}
        {...others}
        value={valObj.end}
        onChange={handleChange('end')}
        onBlur={handleBlur('end')}
        onFocus={handleFocus}
        min={min}
        max={max}
      />
    </div>
  );
};

export default FuyaoRangeInput;
