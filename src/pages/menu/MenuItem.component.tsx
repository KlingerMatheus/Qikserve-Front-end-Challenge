import { Item } from "@/types";
import { FunctionComponent } from "react";

interface Props {
  item: Item;
}

export const MenuItem: FunctionComponent<Props> = ({ item }) => {
  return (
    <div
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
          <span className="item-price">
            R$
            {item.price.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        {item.images && <img src={item.images?.[0].image} alt={item.name} />}
      </div>
    </div>
  );
};
