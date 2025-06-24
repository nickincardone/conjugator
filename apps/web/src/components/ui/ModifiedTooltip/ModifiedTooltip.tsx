import * as React from "react";
import {
  ClickAwayListener,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export interface ModifiedTooltipProps {
  className?: string;
  placement?: "top" | "bottom" | undefined;
  children: React.ReactElement;
  title: string;
}

export default function ModifiedTooltip(props: ModifiedTooltipProps) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const classes: string = "nji-fib-tooltip " + props.className;
  const placement: "top" | "bottom" = props.placement
    ? props.placement
    : "bottom";

  if (isMobile) {
    return (
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div onClick={() => setOpen((oldOpen) => !oldOpen)}>
          <Tooltip
            PopperProps={{ disablePortal: true }}
            onClose={() => setOpen(false)}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={props.title}
            classes={{ tooltip: classes }}
          >
            {props.children}
          </Tooltip>
        </div>
      </ClickAwayListener>
    );
  }

  return (
    <Tooltip
      classes={{ tooltip: classes }}
      placement={placement}
      title={props.title}
    >
      {props.children}
    </Tooltip>
  );
}
