import Skelton from "react-loading-skeleton";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export const SkeltonSignalFind = () => {
  return (
    <React.Fragment>
      <ListGroup>
        {Array(8)
          .fill(0)
          .map((item, index) => (
            <ListGroupItem key={index}>
              <div className="d-flex justify-content-between">
                <span>
                  <Skelton width={100} height={15} />
                </span>
                <span>
                  <Skelton width={100} height={15} />
                </span>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </React.Fragment>
  );
};
