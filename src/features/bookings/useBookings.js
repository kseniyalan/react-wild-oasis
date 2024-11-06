import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";


export function useBookings() {
    const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  // field param is the column name in the database - will be read in the apiBookings.js file
  const filter = !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // Sorting
  // Here "startDate-desc" is the default value if no sortBy query param
  // "startDate" is the column name in the database - will be read in the apiBookings.js file
  // "desc" is the direction of the sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // QUERY
  const {
    isLoading,
    data: { data: bookings } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, error, bookings };
}
