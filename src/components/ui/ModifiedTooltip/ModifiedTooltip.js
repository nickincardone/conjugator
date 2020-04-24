import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';

export default function ModifiedTooltip(props) {
  const [open, setOpen] = React.useState(false);
  const classes = 'nji-fib-tooltip ' + props.className;
  const placement = props.placement ? props.placement : 'bottom';
  return (
    <React.Fragment>
      <Hidden smDown>
        <Tooltip classes={{tooltip: classes}} placement={placement} title={props.title}>
          {props.children}
        </Tooltip>
      </Hidden>
      <Hidden mdUp>
        <ClickAwayListener onClickAway={() => {setOpen(false)}}>
          <div onClick={() => {if (open) setOpen(true)}}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => {setOpen(false)}}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={props.title}
            >
              {props.children}
            </Tooltip>
          </div>
        </ClickAwayListener>
      </Hidden>
    </React.Fragment>

  )
};