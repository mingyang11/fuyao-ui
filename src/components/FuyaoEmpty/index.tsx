import classNames from 'classnames';
import React, { HTMLAttributes, useMemo } from 'react';
// 引入所有图片
import img404 from './imgs/404.png';
import imgError from './imgs/error.png';
import imgGn from './imgs/gn.png';
import imgHt from './imgs/ht.png';
import imgHsqk from './imgs/hsqk.png';
import imgJzsb from './imgs/jzsb.png';
import imgJqqd from './imgs/jqqd.png';
import imgYhk from './imgs/yhk.png';
import imgMrtx from './imgs/mrtx.png';
import imgPj from './imgs/pj.png';
import imgQxbz from './imgs/qxbz.png';
import imgRw from './imgs/rw.png';
import imgShwc from './imgs/shwc.png';
import imgShz from './imgs/shz.png';
import imgSj from './imgs/sj.png';
import imgSswk from './imgs/sswk.png';
import imgNrwk from './imgs/nrwk.png';
import imgWl from './imgs/wl.png';
import imgHm from './imgs/hm.png';
import imgQy from './imgs/qy.png';
import imgXtwh from './imgs/xtwh.png';
import imgYfz from './imgs/yfz.png';
import imgZwnr from './imgs/zwnr.png';
import imgZwxx from './imgs/zwxx.png';
import imgZt from './imgs/zt.png';
import imgXx from './imgs/xx.png';

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

// 图片映射对象
const ImgSrcMaps: Record<string, string> = {
  '404': img404,
  error: imgError,
  gn: imgGn,
  ht: imgHt,
  hsqk: imgHsqk,
  jzsb: imgJzsb,
  jqqd: imgJqqd,
  yhk: imgYhk,
  mrtx: imgMrtx,
  pj: imgPj,
  qxbz: imgQxbz,
  rw: imgRw,
  shwc: imgShwc,
  shz: imgShz,
  sj: imgSj,
  sswk: imgSswk,
  nrwk: imgNrwk,
  wl: imgWl,
  hm: imgHm,
  qy: imgQy,
  xtwh: imgXtwh,
  yfz: imgYfz,
  zwnr: imgZwnr,
  zwxx: imgZwxx,
  zt: imgZt,
  xx: imgXx,
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

interface FuyaoEmptyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 缺省类型
   */
  type?: EmptyType;
  /**
   * 缺省描述，默认和『缺省类型』相同
   */
  description?: string;
  /**
   * 自定义图片URL
   */
  image?: string;
  /**
   * 图片样式
   */
  imageStyle?: React.CSSProperties;
}

const FuyaoEmpty = ({
  type = '数据',
  description,
  className,
  style,
  image,
  imageStyle,
  ...rest
}: FuyaoEmptyProps) => {
  const imgStyle = useMemo(
    () => ({
      backgroundImage: `url(${image})`,
      ...imageStyle,
    }),
    [image, imageStyle]
  );

  const img = type && EmptyImgMaps[type];

  return (
    <div
      className={classNames('fuyao-empty', className)}
      style={style}
      {...rest}
    >
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
