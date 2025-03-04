import { Item } from "@/types";
import { formatPrice } from "@/utils";
import { FunctionComponent, useMemo } from "react";

interface Props {
  item: Item;
  onClick: VoidFunction;
  quantityAdded?: number;
}

export const MenuItem: FunctionComponent<Props> = ({
  item,
  onClick,
  quantityAdded,
}) => {
  const itemPrice = useMemo(() => {
    if (item.modifiers?.[0].items[0])
      return formatPrice(item.modifiers?.[0].items[0].price ?? 0);

    return formatPrice(item.price);
  }, [item]);

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
          <span className="item-name">
            {quantityAdded && (
              <span className="quantity-added">{quantityAdded}</span>
            )}
            {item.name}
          </span>
          {item.description && (
            <span className="item-description">{item.description}</span>
          )}
          <span className="item-price">{itemPrice}</span>
        </div>
        {item.images && (
          <img src={item.images?.[0].image} alt={item.name} loading="lazy" />
        )}
      </div>
    </div>
  );
};
