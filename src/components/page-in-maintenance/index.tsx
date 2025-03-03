import { FunctionComponent } from "react";
import { LeftArrowIcon } from "@/assets/icons";
import { PrimaryButton } from "../primary-button";
import PageInMaintenanceImage from "../../assets/page-in-maintenance.png";

import "./style.css";

interface Props {
  pageExists?: boolean;
}

const PageInMaintenance: FunctionComponent<Props> = ({ pageExists = true }) => {
  function navigateToMenu() {
    window.location.href = "/";
  }

  return (
    <div className="container">
      {pageExists && (
        <img src={PageInMaintenanceImage} alt="Page in maintenance" />
      )}
      <p>
        {pageExists
          ? "This page is currently in maintenance."
          : "This page doesn't exist"}
      </p>
      <PrimaryButton
        startIcon={<LeftArrowIcon />}
        label="Go to Menu"
        onClick={navigateToMenu}
      />
    </div>
  );
};

export default PageInMaintenance;
