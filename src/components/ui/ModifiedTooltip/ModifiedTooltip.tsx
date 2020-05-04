import * as React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';

export interface ModifiedTooltipProps {
  className: string;
  placement?: "top" | undefined;
  children: React.ReactElement;
  title: string;
}

export default function ModifiedTooltip(props: ModifiedTooltipProps) {
  const [open, setOpen] = React.useState(false);
  const classes: string = 'nji-fib-tooltip ' + props.className;
  const placement: "top" | "bottom" = props.placement ? props.placement : "bottom";

  return (
    <React.Fragment>
      <Hidden smDown>
        <Tooltip classes={{tooltip: classes}} placement={placement} title={props.title}>
          {props.children}
        </Tooltip>
      </Hidden>
      <Hidden mdUp>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div onClick={() => {if (open) setOpen(true)}}>
            <Tooltip
              PopperProps={{ disablePortal: true, }}
              onClose={() => setOpen(false)}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={props.title} >
              {props.children}
            </Tooltip>
          </div>
        </ClickAwayListener>
      </Hidden>
    </React.Fragment>
  )
};