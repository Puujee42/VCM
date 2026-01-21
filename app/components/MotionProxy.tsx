"use client";

import { motion as framerMotion, MotionProps } from "framer-motion";
import React, { useEffect, useState, ForwardRefExoticComponent, RefAttributes } from "react";

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
    "viewport", // for whileInView options
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

// Create a proxy that intercepts property access
const Motion = new Proxy(framerMotion, {
    get: (target: any, prop: string) => {
        // Return a Functional Component that decides what to render
        const Component = React.forwardRef((props: any, ref: any) => {
            const isMobile = useIsMobile();

            if (isMobile) {
                // If mobile, render the native HTML tag (e.g., 'div', 'span') with filtered props
                const Tag = prop as keyof JSX.IntrinsicElements;
                const nativeProps = filterProps(props);
                return <Tag {...nativeProps} ref={ref} />;
            }

            // If desktop, render the original motion component
            const MotionComponent = target[prop];
            return <MotionComponent {...props} ref={ref} />;
        });

        Component.displayName = `MotionProxy.${prop}`;
        return Component;
    }
});

export { Motion };
export type { MotionProps };
