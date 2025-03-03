import { Item } from "@/types";
import { formatPrice } from "@/utils";
import { FunctionComponent } from "react";

interface Props {
  item: Item;
  onClick: VoidFunction;
}

export const MenuItem: FunctionComponent<Props> = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={
        item.description || item.images
          ? "menu-list-item-container with-description"
          : " menu-list-item-container default"
      }
    >
      <div className="menu-list-item">
        <div className="menu-list-info">
          <span className="item-name">{item.name}</span>
          {item.description && (
            <span className="item-description">{item.description}</span>
          )}
          <span className="item-price">{formatPrice(item.price)}</span>
        </div>
        {item.images && (
          <img src={item.images?.[0].image} alt={item.name} loading="lazy" />
        )}
      </div>
    </div>
  );
};
