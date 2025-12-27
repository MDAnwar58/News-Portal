import React from "react";
import { Pagination } from "react-bootstrap";

export default function CategoryPagination() {
   return (
      <Pagination>
         <Pagination.First />
         <Pagination.Item>{1}</Pagination.Item>
         <Pagination.Ellipsis />

         <Pagination.Item>{10}</Pagination.Item>
         <Pagination.Item>{11}</Pagination.Item>
         <Pagination.Item active>{12}</Pagination.Item>
         <Pagination.Item>{13}</Pagination.Item>
         <Pagination.Item disabled>{14}</Pagination.Item>

         <Pagination.Ellipsis />
         <Pagination.Item>{20}</Pagination.Item>
         <Pagination.Last />
      </Pagination>
   );
}
