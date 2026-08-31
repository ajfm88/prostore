import Link from "next/link";
import { getAllPromos, deletePromo } from "@/lib/actions/promo.actions";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/delete-dialog";
import { requireAdmin } from "@/lib/auth-guard";

const AdminPromosPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
}) => {
  await requireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";

  const promos = await getAllPromos({
    query: searchText,
    page,
  });

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <h1 className="h2-bold">Promo Codes</h1>
          {searchText && (
            <div>
              Filtered by <i>&quot;{searchText}&quot;</i>{" "}
              <Link href="/admin/promos">
                <Button variant="outline" size="sm">
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant="default">
          <Link href="/admin/promos/create">Create Promo</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>CODE</TableHead>
            <TableHead className="text-right">DISCOUNT</TableHead>
            <TableHead className="text-right">MIN ORDER</TableHead>
            <TableHead className="text-right">REMAINING</TableHead>
            <TableHead>STARTS</TableHead>
            <TableHead>ENDS</TableHead>
            <TableHead className="w-[100px]">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promos.data.map((promo) => (
            <TableRow key={promo.id}>
              <TableCell>{formatId(promo.id)}</TableCell>
              <TableCell>{promo.code}</TableCell>
              <TableCell className="text-right">{promo.percentage}%</TableCell>
              <TableCell className="text-right">
                {formatCurrency(promo.minimumOrderValue.toString())}
              </TableCell>
              <TableCell className="text-right">{promo.count}</TableCell>
              <TableCell>{formatDateTime(promo.startsAt).dateOnly}</TableCell>
              <TableCell>{formatDateTime(promo.endsAt).dateOnly}</TableCell>
              <TableCell className="flex gap-1">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/promos/${promo.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={promo.id} action={deletePromo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {promos.totalPages > 1 && (
        <Pagination page={page} totalPages={promos.totalPages} />
      )}
    </div>
  );
};

export default AdminPromosPage;
