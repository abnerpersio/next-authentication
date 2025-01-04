'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

type Order = {
  id: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get<{ orders: Order[] }>('/api/orders')
      .then((result) => setOrders(result.data?.orders || []))
      .catch(() => {});
  }, []);

  return (
    <div>
      Orders:{' '}
      {orders.map((order) => (
        <span className="block" key={order.id}>
          {order.id}
        </span>
      ))}
    </div>
  );
}
