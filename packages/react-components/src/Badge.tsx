// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { IconName } from '@fortawesome/fontawesome-svg-core';

import React, { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ThemeDef } from '@polkadot/react-components/types';

import Icon from './Icon';
import Tooltip from './Tooltip';

interface Props {
  className?: string;
  color?: 'blue' | 'gray' | 'green' | 'highlight' | 'normal' | 'orange' | 'purple' | 'red' | 'transparent' | 'white';
  hover?: React.ReactNode;
  hoverAction?: React.ReactNode;
  icon?: IconName;
  info?: React.ReactNode;
  isSmall?: boolean;
  onClick?: () => void;
}

let badgeId = 0;

function Badge ({ className = '', color = 'normal', hover, hoverAction, icon, info, isSmall, onClick }: Props): React.ReactElement<Props> | null {
  const badgeTestId = `${color}${icon ? `-${icon}` : ''}-badge`;
  const { theme } = useContext<ThemeDef>(ThemeContext);

  const [trigger] = useState(() => `${badgeTestId}-hover-${Date.now()}-${badgeId++}`);
  const extraProps = hover
    ? { 'data-for': trigger, 'data-tip': true }
    : {};
  const isHighlight = color === 'highlight';

  const hoverContent = useMemo(() => (
    <div className='hoverContent'>
      <div>{hover}</div>
      {hoverAction && (
        <a onClick={onClick}>{hoverAction}</a>
      )}
    </div>
  ), [hover, hoverAction, onClick]);

  return (
    <div
      {...extraProps}
      className={`ui--Badge${hover ? ' isTooltip' : ''}${isSmall ? ' isSmall' : ''}${onClick ? ' isClickable' : ''}${isHighlight ? ' highlight--bg' : ''} ${color}Color ${className}${icon ? ' withIcon' : ''}${info ? ' withInfo' : ''}${hoverAction ? ' withAction' : ''} ${theme}Theme `}
      data-testid={badgeTestId}
      onClick={hoverAction ? undefined : onClick}
    >
      <div className={isHighlight ? 'highlight--color-contrast' : ''}>
        {(icon && <Icon icon={icon} />)}
        {info}
        {hoverAction && (
          <Icon
            className='action-icon'
            icon='chevron-right'
          />
        )}
      </div>
      {hover && (
        <Tooltip
          className='accounts-badge'
          clickable={!!hoverAction}
          text={hoverContent}
          trigger={trigger}
        />
      )}
    </div>
  );
}

export default React.memo(styled(Badge)`
  border-radius: 16px;
  box-sizing: border-box;
  color: #eeedec;
  display: inline-block;
  font-size: 12px;
  height: 22px;
  line-height: 22px;
  margin-right: 0.43rem;
  min-width: 22px;
  padding: 0 4px;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  width: 22px;

  &.isTooltip {
    cursor: help;
  }

  .ui--Icon {
    cursor: inherit;
    margin-top: 5px;
    vertical-align: top;
    width: 1em;
  }

  &.isClickable:not(.withAction) {
    cursor: pointer;
  }

  &.isSmall {
    font-size: 10px;
    height: 16px;
    line-height: 16px;
    min-width: 16px;
    padding: 0;
    width: 16px;

    .ui--Icon {
      margin-top: 3px;
    }
  }

  &.blueColor {
    background: steelblue;
  }

  &.counterColor {
    margin: 0 0.5rem;
    vertical-align: middle;
  }

  &.grayColor {
    background: #eeedec !important;
    color: #aaa9a8;
  }

  &.redColor {
    background: darkred;
  }

  &.greenColor {
    background: green;
  }

  &.orangeColor {
    background: darkorange;
  }

  &.purpleColor {
    background: indigo;
  }

  &.transparentColor {
    background: transparent;
    box-shadow: none;
  }

  &.whiteColor {
    background: rgba(255, 255, 255, 0.3);
  }

  &.recovery {
    background: linear-gradient(0deg, rgba(17, 185, 74, 0.08), rgba(17, 185, 74, 0.08)), #FFFFFF;
    color: #11B94A;
    &.darkTheme {
      background: linear-gradient(0deg, rgba(17, 185, 74, 0.08), rgba(17, 185, 74, 0.08)), #212227;
    }
  }

  &.warning {
    background: linear-gradient(0deg, rgba(232, 111, 0, 0.08), rgba(232, 111, 0, 0.08)), #FFFFFF;
    color: #FF7D01;
    &.darkTheme {
      background: linear-gradient(0deg, rgba(232, 111, 0, 0.08), rgba(232, 111, 0, 0.08)), #212227;
    }
  }

  &.information {
    background: linear-gradient(0deg, rgba(226, 246, 255, 1), rgba(226, 246, 255, 1)), #FFFFFF;
    color: #3BBEFF;
    &.darkTheme {
      background: linear-gradient(0deg, rgba(226, 246, 255, 1), rgba(226, 246, 255, 1)), #212227;
    }
  }

  &.important {
    background: rgba(230, 0, 122, 0.08);
    color: #E6007A;
    &.darkTheme {
      background: linear-gradient(0deg, rgba(230, 0, 122, 0.08), rgba(230, 0, 122, 0.08)), #212227;
    }
  }

  &.withAction.withIcon:not(.withInfo) {
    width: 34px;
    border-radius: 4px;
  }

  &.withInfo.withIcon:not(.withAction) {
    width: 34px;
    border-radius: 18px;
  }

  &.withAction.withIcon.withInfo {
    width: 44px;
    border-radius: 4px;
  }

  &.withInfo .ui--Icon:not(.action-icon) {
    margin-right: 4px;
  }

  .hoverContent {
    display: flex;
    flex-direction: column;
  }

  .action-icon {
    margin-left: 4px;
  }
`);
