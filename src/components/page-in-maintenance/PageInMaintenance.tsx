import { FunctionComponent } from "react";

import { LeftArrowIcon } from "../../assets/icons";
import { PrimaryButton } from "../../components/primary-button/PrimaryButton";
import PageInMaintenanceImage from "../../assets/page-in-maintenance.webp";

import "./page-in-maintenance.css";
import { useTranslation } from "react-i18next";

interface Props {
  pageExists?: boolean;
}

const PageInMaintenance: FunctionComponent<Props> = ({ pageExists = true }) => {
  const { t } = useTranslation("common");

  function navigateToMenu() {
    window.location.href = "/";
  }

  return (
    <div className="container">
      {pageExists && (
        <img src={PageInMaintenanceImage} alt="Page in maintenance" />
      )}
      <p>
        {pageExists ? t("common:pageInMaintenance") : t("common:pageNotFound")}
      </p>
      <PrimaryButton
        startIcon={<LeftArrowIcon />}
        label={t("common:goToMenu")}
        onClick={navigateToMenu}
      />
    </div>
  );
};

export default PageInMaintenance;
