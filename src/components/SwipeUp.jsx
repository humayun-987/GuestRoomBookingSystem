import React from "react";

export default function SwipeUp({
  children,
  delay = 0,
  useWhileInView = true,
  once = true,
}) {
  const animationProps = {
    initial: { translateY: 25, opacity: 0 },
    animate: useWhileInView
      ? undefined
      : {
          translateY: 0,
          opacity: 1,
          transition: { duration: 0.5, delay },
        },
    whileInView: useWhileInView
      ? {
          translateY: 0,
          opacity: 1,
          transition: { duration: 0.5, delay },
        }
      : undefined,
    viewport: useWhileInView ? { once } : undefined,
  };

  const applyAnimation = (child, index) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          ...animationProps,
          ...child.props,
          animate: animationProps.animate && {
            ...animationProps.animate,
            transition: {
              ...animationProps.animate.transition,
              delay: delay + index * 0.1,
            },
          },
          whileInView: animationProps.whileInView && {
            ...animationProps.whileInView,
            transition: {
              ...animationProps.whileInView.transition,
              delay: delay + index * 0.2,
            },
          },
        })
      : child;

  const childArray = React.Children.toArray(children);
  return <>{childArray.map(applyAnimation)}</>;
}
