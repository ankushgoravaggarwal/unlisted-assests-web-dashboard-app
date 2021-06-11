import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import breathumbs from "../../assets/breathumbs.svg";
import Link from '@material-ui/core/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function SimpleBreadcrumbs() {
  return (
    <div className="p-3">
    <Breadcrumbs aria-label="breadcrumb">
      {/* <Link color="inherit" href="/" onClick={handleClick}>
        Home
      </Link>
      <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
        Inventory
      </Link>
      <Typography color="textPrimary">Breadcrumb</Typography> */}
      <div className="breathumbs-top">
            <ul>
              <li>
                <Link color="inherit" href="/" onClick={handleClick}><FontAwesomeIcon icon={faHome} /></Link>
              </li>
              <li><img src={breathumbs} /></li>
              <li>Page Name</li>
            </ul>
      </div>
    </Breadcrumbs>
    </div>
  );
}