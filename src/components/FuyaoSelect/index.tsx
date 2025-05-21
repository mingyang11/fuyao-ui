import { Checkbox, Select } from 'antd';
import type { SelectProps } from 'antd/es/select';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { classnames, types } from '../../utils/index';
import './index.less';

export interface FuyaoSelectProps extends Omit<SelectProps, 'options'> {
  /**
   * 是否显示全选功能，当显示全选时，则 mode 默认为 'multiple'，全选时不支持搜索
   */
  showSelectAll?: boolean;
  /**
   * 全选描述
   */
  selectAllText?: string;
  /**
   * 是否显示 Checkbox，是则 mode 默认 'multiple' 模式
   */
  checkAble?: boolean;
  /**
   * 选项条件
   */
  options?: { value: any; label: string; disabled?: boolean }[];
}

// 自定义最大标签占位符渲染函数
const renderMaxTagPlaceholder = (
  callback?: (values: any[]) => any[],
  j4 = false
) => {
  return (values: any[]) => {
    if (!j4 && callback) {
      values = callback(values);
    }
    return (
      <span className="fuyao-max-tag-placeholder">
        已选择{values?.length}项
      </span>
    );
  };
};

/**
 * 富耀选择器组件
 */
const FuyaoSelect = (props: FuyaoSelectProps) => {
  const {
    checkAble,
    showSelectAll,
    selectAllText,
    dropdownRender,
    options = [],
    onChange,
    value,
    defaultValue,
    labelInValue,
    className,
    ...others
  } = props;

  const selectProps = { ...others };
  selectProps.mode = showSelectAll || checkAble ? 'multiple' : selectProps.mode;
  selectProps.showSearch = showSelectAll ? false : selectProps.showSearch;

  // 获取值数组
  const getValue = useCallback((val: any): any[] => {
    if (val === null || val === undefined || val === '') {
      return [];
    }
    return Array.isArray(val) ? val : [val];
  }, []);

  // 获取选项值
  const getOpValue = useCallback((op: any): any => {
    return typeof op === 'object' && op !== null ? op.value : op;
  }, []);

  // 获取指定值的选项
  const getOption = useCallback(
    (val: any) => {
      return options?.find((item) => item.value === val);
    },
    [options]
  );

  // 内部选中值状态
  const [list, upList] = useState<any[]>(
    getValue(value || defaultValue).map(getOpValue)
  );

  // 监听外部值变化
  useEffect(() => {
    if ('value' in props) {
      upList(getValue(value).map(getOpValue));
    }
  }, [props.value, getValue, getOpValue]);

  /**
   * 值变更处理
   */
  const handleChange = useCallback(
    (newValue: any) => {
      const transOption = () => {
        if (Array.isArray(newValue)) {
          return newValue.map(getOption);
        } else {
          return getOption(newValue);
        }
      };
      if (!('value' in props)) {
        upList(Array.isArray(newValue) ? newValue : [newValue]);
      }
      const selectedOptions = transOption();
      onChange?.(labelInValue ? selectedOptions : newValue, selectedOptions);
    },
    [onChange, options, labelInValue, getOption, props]
  );

  // 已经选择的不可操作默认项
  const disabledChecked = list.filter((val) => getOption(val)?.disabled);

  // 可选择的项
  const enabled = options?.filter(({ disabled }) => !disabled) || [];

  // 是否已经全选
  const checkedAll =
    enabled.length > 0 &&
    list.length === enabled.length + disabledChecked.length;

  /**
   * 全选/取消全选
   */
  const handleSelectAll = () => {
    // 已经全选
    if (checkedAll) {
      handleChange([...disabledChecked]);
    } else {
      handleChange([...disabledChecked, ...enabled.map((item) => item.value)]);
    }
  };

  /**
   * 自定义选项渲染
   */
  const ops = useMemo(
    () =>
      options.map(({ value, label, disabled }) => ({
        value,
        disabled,
        label:
          showSelectAll || checkAble ? (
            <div
              className={classnames(
                'ant-select-item-option-content',
                'fuyao-select-checkable-item'
              )}
            >
              <Checkbox
                className="fuyao-select-item-checkbox"
                disabled={disabled}
                checked={list.includes(value)}
              />
              {label}
            </div>
          ) : (
            label
          ),
      })),
    [options, showSelectAll, checkAble, list]
  );

  /**
   * 自定义下拉菜单渲染
   */
  const render = useCallback(
    (originNode: React.ReactNode) => {
      if (!showSelectAll && !checkAble)
        return dropdownRender ? dropdownRender(originNode) : originNode;

      // 使用默认渲染
      return (
        <div className="fuyao-select-dropdown">
          {showSelectAll && !!enabled.length && (
            <div
              className={classnames('fuyao-select-all')}
              onClick={handleSelectAll}
            >
              <Checkbox
                checked={checkedAll}
                indeterminate={
                  !checkedAll && list.length > disabledChecked.length
                }
                className="fuyao-select-item-checkbox"
              />{' '}
              {selectAllText}
            </div>
          )}
          {originNode}
        </div>
      );
    },
    [
      showSelectAll,
      selectAllText,
      checkAble,
      dropdownRender,
      list,
      enabled,
      disabledChecked,
      checkedAll,
      handleSelectAll,
    ]
  );

  /**
   * 多条件展示
   */
  const maxTagPlaceholderRender = useCallback(
    renderMaxTagPlaceholder((values) => {
      return values.map((item: any) => getOption(item.value));
    }),
    [getOption]
  );

  /**
   * 多选图标
   */
  const iconProps = useMemo(
    () =>
      showSelectAll || checkAble
        ? {
            menuItemSelectedIcon: null,
          }
        : {},
    [showSelectAll, checkAble]
  );

  /**
   * 搜索过滤
   */
  const filterOption = (inputValue: string, option: any) => {
    const optionData = getOption(option?.value) || option;
    return typeof optionData === 'string'
      ? optionData.toLowerCase().includes(inputValue.toLowerCase())
      : optionData?.label?.toLowerCase()?.includes(inputValue.toLowerCase());
  };

  return (
    <Select
      className={classnames('fuyao-select', className)}
      filterOption={filterOption}
      dropdownRender={render}
      options={ops}
      value={list}
      {...iconProps}
      onChange={handleChange}
      maxTagPlaceholder={maxTagPlaceholderRender}
      {...selectProps}
    />
  );
};

// 设置默认属性
const defaultProps = {
  showSelectAll: false,
  selectAllText: '全选',
  checkAble: false,
  options: [],
};

FuyaoSelect.defaultProps = defaultProps;

export default FuyaoSelect;
