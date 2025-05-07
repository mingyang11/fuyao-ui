import React, { HTMLAttributes } from 'react';
declare const EmptyImgMaps: {
    '404\u9875\u9762': string;
    服务器异常: string;
    功能: string;
    合同: string;
    核实情况: string;
    加载失败: string;
    敬请期待: string;
    没有绑定银行卡: string;
    纳税人默认头像: string;
    票据: string;
    权限不足: string;
    任务: string;
    审核完成: string;
    审核中: string;
    数据: string;
    搜索为空: string;
    图表内容为空: string;
    网络不给力: string;
    未绑定电话号码: string;
    未绑定企业: string;
    系统维护: string;
    研发中: string;
    暂无内容: string;
    暂无信息: string;
    帐套: string;
    XX加载失败: string;
};
export type EmptyType = keyof typeof EmptyImgMaps;
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
declare const FuyaoEmpty: React.FC<FuyaoEmptyProps>;
export default FuyaoEmpty;
