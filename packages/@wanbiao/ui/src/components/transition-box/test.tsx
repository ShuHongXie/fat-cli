import NormalImage from '@/components/common/NormalImage';
import useUpdate from '@/hooks/useUpdate';
import { FC, memo, ReactNode, useEffect, useRef, useState } from 'react';

import style from './TransitionBox.module.scss';

type TransitionBoxProps = {
  data: Array<any>;
  title?: string;
  showDelete?: boolean;
  showItemDelete?: boolean;
  delItem?: (tag: string) => void;
  selectTag?: any;
  deleteTag?: any;
  children: ReactNode[] | ReactNode;
};

/**
 * 一个能始终让点击的item滚动到居中位置的组件
 */
const TransitionBox: FC<TransitionBoxProps> = memo(({ data, children }) => {
  const [child, setChild] = useState(Array.isArray(children) ? children : [children]);
  const update = useUpdate();
  const childRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setChild(Array.isArray(children) ? children : [children]);
  }, [children]);

  // 点击某一个子项，让子项滚动到居中位置
  const clickChild = (e: React.MouseEvent<HTMLElement>, index: number) => {
    console.log('--');

    if (!child.length) return;
    console.log(childRef.current);
    const { offsetParent: parent, clientWidth, offsetLeft } = childRef.current[index];
    // 当前屏幕居中的距离
    const verticalCenterDir = parent!.clientWidth / 2 - clientWidth / 2;
    // 父级的滚动值
    const originParentScrollLeft = parent!.scrollLeft;
    // 如果当前的到父级的距离 大于 父级到当前元素距离的一半，那么就需要进行动画滚动
    const scrollDuration = offsetLeft > verticalCenterDir + originParentScrollLeft ? 4 : -4;
    // 实际当前要滚动到的值
    const scrollDistance = offsetLeft - verticalCenterDir;
    let arriveLeft = originParentScrollLeft;
    const step = () => {
      arriveLeft = arriveLeft + scrollDuration;
      parent!.scrollLeft = arriveLeft;
      if (offsetLeft > verticalCenterDir + originParentScrollLeft) {
        if (arriveLeft < scrollDistance) {
          requestAnimationFrame(step);
        }
      } else {
        if (arriveLeft > scrollDistance) {
          requestAnimationFrame(step);
        }
      }
    };
    requestAnimationFrame(step);
  };

  const getChild = (index: number, node: HTMLDivElement) => {
    childRef.current[index] = node;
  };

  return (
    <div className={style['transition-box']}>
      {data.map((item, index) => (
        <div
          key={index}
          ref={(div: HTMLDivElement) => getChild(index, div)}
          onClick={(e) => clickChild(e, index)}>
          {child[index]}
        </div>
      ))}
    </div>
  );
});

export default TransitionBox;
