import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type Role = "OWNER" | "KASIR" | "MEKANIK";

export interface UserSession {
  name: string;
  role: Role;
  branchId: string;
}

// 1. Ambil session simulasi dari cookie
export async function getSession(): Promise<UserSession> {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get("simulasi_role")?.value as Role;

  const validRoles: Role[] = ["OWNER", "KASIR", "MEKANIK"];
  const currentRole = validRoles.includes(roleCookie) ? roleCookie : "KASIR";

  return {
    name:
      currentRole === "OWNER"
        ? "Daeng Pranata (Owner Pusat)"
        : currentRole === "KASIR"
        ? "Siti Kasir (Front Desk)"
        : "Kang Yopi (Mekanik Senior)",
    role: currentRole,
    branchId: "CABANG_SUMEDANG_01",
  };
}

// 2. Action Switch Role Simulasi (Biar user bisa tes ganti peran langsung)
export async function switchRoleAction(formData: FormData) {
  "use server";
  const newRole = formData.get("role") as string;
  const cookieStore = await cookies();
  cookieStore.set("simulasi_role", newRole, { path: "/" });
  revalidatePath("/rbac-meja-vip");
}

// 3. Action Terproteksi (Hanya OWNER yang boleh eksekusi!)
export async function deleteSensitiveDataAction(formData: FormData) {
  "use server";
  const session = await getSession();

  // Guard Baris Pertama: Cek Role Server-Side!
  if (session.role !== "OWNER") {
    throw new Error(
      `AKSES ILEGAL! Anda login sebagai [${session.role}], dilarang keras menghapus arsip pembukuan!`
    );
  }

  const itemId = formData.get("itemId") as string;
  console.log(`[RBAC] Berhasil menghapus item: ${itemId} oleh ${session.name}`);
  revalidatePath("/rbac-meja-vip");
}
