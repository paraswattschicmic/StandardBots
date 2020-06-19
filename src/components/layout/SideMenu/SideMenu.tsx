import React, { useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Collapse from '@material-ui/core/Collapse'
import { NavLink, useLocation } from 'react-router-dom'

import './SideMenu.css'
interface SideMenuProps {
  items: any
  depthStep: number
  depth: number
  expanded: boolean
}

interface SideMenuItemProps {
  item: any
  depthStep: number
  depth: number
  expanded: boolean
}

const SideMenuItem: React.SFC<SideMenuItemProps> = ({ depthStep = 10, depth = 0, expanded = false, item, ...rest }) => {
  const [collapsed, setCollapsed] = React.useState(true)
  const { label, items, Icon } = item
  const location = useLocation()
  useEffect(() => {
    setCollapsed(expanded)
  }, [])

  const toggleCollapse = () => {
    setCollapsed(prevValue => !prevValue)
  }

  const onClickFunction = () => {
    if (Array.isArray(items)) {
      toggleCollapse()
    }
  }

  let expandIcon

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ArrowDropUpIcon className={'sidebar-item-expand-arrow' + ' sidebar-item-expand-arrow-expanded'} />
    ) : (
        <ArrowDropDownIcon className="sidebar-item-expand-arrow" />
      )
  }

  return (
    <>
      {item.type === 'route' ? (
        <NavLink to={item.route}>
          <ListItem
            style={{ marginLeft: 20 }}
            className={`sidebar-item ${location && location.pathname == item.route && 'active'}`}
            onClick={onClickFunction}
            button
            dense
            {...rest}
          >
            {expandIcon}
            <div style={{ paddingLeft: depth * depthStep }} className="sidebar-item-content">
              {Icon && (
                <Icon
                  className="sidebar-item-icon"
                  classes={{
                    root: 'icon'
                  }}
                />
              )}
              <div className="sidebar-item-text">{label}</div>
            </div>
          </ListItem>
          <Collapse in={!collapsed} timeout="auto" unmountOnExit>
            {Array.isArray(items) ? (
              <List disablePadding dense>
                {items.map((subItem, index) => (
                  <React.Fragment key={`${subItem.name}${index}`}>
                    {subItem.name === 'divider' ? (
                      <Divider style={{ margin: '6px 0' }} />
                    ) : (
                        <SideMenuItem depth={depth + 1} depthStep={depthStep} item={subItem} expanded={expanded} />
                      )}
                  </React.Fragment>
                ))}
              </List>
            ) : null}
          </Collapse>
        </NavLink>
      ) : (
          <>
            <ListItem className="sidebar-item" onClick={onClickFunction} button dense {...rest}>
              {expandIcon}
              <div style={{ paddingLeft: depth * depthStep }} className="sidebar-item-content">
                {Icon && (
                  <Icon
                    className="sidebar-item-icon"
                    classes={{
                      root: 'icon'
                    }}
                  />
                )}
                <div className="sidebar-item-text">{label}</div>
              </div>
            </ListItem>
            <Collapse in={!collapsed} timeout="auto" unmountOnExit>
              {Array.isArray(items) ? (
                <List disablePadding dense>
                  {items.map((subItem, index) => (
                    <React.Fragment key={`${subItem.name}${index}`}>
                      {subItem.name === 'divider' ? (
                        <Divider style={{ margin: '6px 0' }} />
                      ) : (
                          <SideMenuItem depth={depth + 1} depthStep={depthStep} item={subItem} expanded={expanded} />
                        )}
                    </React.Fragment>
                  ))}
                </List>
              ) : null}
            </Collapse>
          </>
        )}
    </>
  )
}
const SideMenu: React.SFC<SideMenuProps> = ({ items, depthStep = 10, depth = 0, expanded = false }) => {
  return (
    <div className="sidebar">
      <List disablePadding dense>
        {items.map((sidebarItem: any, index: number) => (
          <React.Fragment key={`${sidebarItem.name}${index}`}>
            {sidebarItem.name === 'divider' ? (
              <Divider style={{ margin: '6px 0' }} />
            ) : (
                <SideMenuItem depthStep={depthStep} depth={depth} expanded={expanded} item={sidebarItem} />
              )}
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

export default SideMenu
