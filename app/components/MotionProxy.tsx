"use client";

import { m, MotionProps } from "framer-motion";
import React, { useEffect, useState, useMemo } from "react";

// Hook to detect mobile
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);
    return isMobile;
};

// List of motion-specific props to filter out for native elements
const motionProps = new Set([
    "initial",
    "animate",
    "exit",
    "transition",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView",
    "layout",
    "layoutId",
    "onLayoutAnimationStart",
    "onLayoutAnimationComplete",
    "onViewportBoxUpdate",
    "onUpdate",
    "onDrag",
    "onDragStart",
    "onDragEnd",
    "onMeasureDragConstraints",
    "drag",
    "dragControls",
    "dragListener",
    "dragConstraints",
    "dragElastic",
    "dragMomentum",
    "dragPropagation",
    "dragTransition",
    "onPan",
    "onPanStart",
    "onPanEnd",
    "onPanSessionStart",
    "onTap",
    "onTapStart",
    "onTapCancel",
    "onHoverStart",
    "onHoverEnd",
    "viewport", 
]);

// Helper to filter props
const filterProps = (props: any) => {
    const newProps: any = {};
    for (const key in props) {
        if (!motionProps.has(key)) {
            newProps[key] = props[key];
        }
    }
    return newProps;
};

// Component cache to ensure stable references
const componentCache: Record<string, React.ForwardRefExoticComponent<any>> = {};

const Motion = new Proxy(m, {
    get: (target: any, prop: string) => {
        if (typeof prop !== 'string') return target[prop];
        
        if (componentCache[prop]) {
            return componentCache[prop];
        }

        const Component = React.forwardRef((props: any, ref: any) => {
            const isMobile = useIsMobile();

            if (isMobile) {
                const Tag = prop as any;
                const nativeProps = filterProps(props);
                return <Tag {...nativeProps} ref={ref} />;
            }

            const MotionComponent = target[prop];
            if (!MotionComponent) {
                return React.createElement(prop, props, props.children);
            }
            return <MotionComponent {...props} ref={ref} />;
        });

        Component.displayName = `MotionProxy.${prop}`;
        componentCache[prop] = Component;
        return Component;
    }
});

export { Motion };
export type { MotionProps };
