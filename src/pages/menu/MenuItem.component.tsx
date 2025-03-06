import { useSelector } from "react-redux";
import { Item, RootState } from "../../types";
import { formatPrice, translateItemDescription } from "../../utils";
import { FunctionComponent, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  item: Item;
  onClick: () => void;
  quantityAdded?: number;
}

export const MenuItem: FunctionComponent<Props> = ({
  item,
  onClick,
  quantityAdded,
}) => {
  const { t } = useTranslation(["menu", "common"]);
  const currency = useSelector(
    (state: RootState) => state.venue.data?.ccySymbol
  );
  const itemPrice = useMemo(() => {
    if (item.modifiers?.[0].items[0])
      return formatPrice(item.modifiers?.[0].items[0].price ?? 0, currency);

    return formatPrice(item.price, currency);
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
            <span className="item-description">
              {translateItemDescription(item.description, t)}
            </span>
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
