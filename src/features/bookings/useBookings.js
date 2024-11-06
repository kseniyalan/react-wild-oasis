import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {

  // QUERY
  const {
    isLoading,
    data: { data: bookings } = {},
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookings(),
  });

  return { isLoading, error, bookings };
}
