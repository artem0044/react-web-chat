import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import style from './Contextmenu.module.css';

function handleClick(e, data) {
  console.log(data.foo);
}

const Contextmenu = ({ children, menuItems, id, handleClick }) => {

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}

      <ContextMenuTrigger id="same_unique_identifier">
        {/* <div className="well">Right click to see the menu</div> */}
        {children}
      </ContextMenuTrigger>

      <ContextMenu className={style.contextmenu} id="same_unique_identifier">
        {menuItems.map(({ fieldName }) => <MenuItem className={style.menuitem} data={{ fieldName }} onClick={handleClick} key={fieldName}>{fieldName}</MenuItem>)}
      </ContextMenu>

    </div>
  );
}

export default Contextmenu;