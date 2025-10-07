import { getCompanies } from "@/api/company.api";

import { useQuery } from "@tanstack/react-query";

export default function useCompany() {
  const getCompanyQuery = useQuery({
    queryKey: ["companies"],
    queryFn: () => {
      return getCompanies();
    },
  });
  return { getCompanyQuery };
}
