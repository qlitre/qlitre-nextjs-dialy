import { ComponentProps, forwardRef, ReactNode } from "react";
import { joinClasses } from "../../libs/joinClasses";
import styles from "styles/components/shared/IconButton.module.scss";

type IconButtonProps = Omit<ComponentProps<"button">, "children"> & {
    icon: ReactNode;
    "aria-label": string;
    variant?: "ghost" | "outlined";
    color?: "normal" | "primary";
    size?: "md";
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    function IconButton(
        { icon, variant = "ghost", color = "normal", size = "md", className, ...buttonProps },
        forwardedRef,
    ) {
        return (
            <button
                {...buttonProps}
                ref={forwardedRef}
                type={buttonProps.type ?? "button"}
                className={joinClasses(
                    styles.iconButton,
                    styles[`size-${size}`],
                    styles[`color-${color}`],
                    styles[`variant-${variant}`],
                    className,
                )}>
                {icon}
            </button>
        );
    },
);