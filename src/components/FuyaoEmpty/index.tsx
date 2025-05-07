import classNames from 'classnames';
import React, { HTMLAttributes, useMemo } from 'react';

const EmptyImgMaps = {
  '404页面': '404',
  服务器异常: 'error',
  功能: 'gn',
  合同: 'ht',
  核实情况: 'hsqk',
  加载失败: 'jzsb',
  敬请期待: 'jqqd',
  没有绑定银行卡: 'yhk',
  纳税人默认头像: 'mrtx',
  票据: 'pj',
  权限不足: 'qxbz',
  任务: 'rw',
  审核完成: 'shwc',
  审核中: 'shz',
  数据: 'sj',
  搜索为空: 'sswk',
  图表内容为空: 'nrwk',
  网络不给力: 'wl',
  未绑定电话号码: 'hm',
  未绑定企业: 'qy',
  系统维护: 'xtwh',
  研发中: 'yfz',
  暂无内容: 'zwnr',
  暂无信息: 'zwxx',
  帐套: 'zt',
  XX加载失败: 'xx',
};

export type EmptyType = keyof typeof EmptyImgMaps;

const isNoPaddingButton = (type?: any) =>
  [
    '404页面',
    '加载失败',
    '敬请期待',
    '没有绑定银行卡',
    '纳税人默认头像',
    '网络不给力',
    '未绑定电话号码',
  ].includes(type);

type FuyaoEmptyProps = {
  /**
   * 缺省类型
   */
  type?: EmptyType;
  /**
   * 缺省描述，默认和『缺省类型』相同
   */
  description?: string;
  image?: string;
  imageStyle?: React.CSSProperties;
} & HTMLAttributes<any>;

const FuyaoEmpty: React.FC<FuyaoEmptyProps> = (props) => {
  const { type, description, className, style, image, imageStyle } = props;

  const imgStyle = useMemo(
    () => ({
      backgroundImage: `url(${image})`,
      ...imageStyle,
    }),
    [image, imageStyle]
  );

  const img = type && EmptyImgMaps[type];

  return (
    <div className={classNames('fuyao-empty', className)} style={style}>
      {img ? (
        <div
          style={imageStyle}
          className={classNames(
            'fuyao-empty-img-inner',
            `fuyao-empty-img-${img}`
          )}
        />
      ) : (
        <div className="fuyao-empty-img" style={imgStyle} />
      )}
      <div
        className={classNames(
          'fuyao-empty-desc',
          isNoPaddingButton(type) && ' no-padding',
          type === '审核中' && 'type-audit',
          type === '404页面' && 'type-404'
        )}
      >
        {description ?? (type === '审核中' ? '审核中...' : type)}
      </div>
    </div>
  );
};

export default FuyaoEmpty;
