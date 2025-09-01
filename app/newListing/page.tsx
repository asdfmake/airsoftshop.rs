import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth"; // adjust for your auth
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Container, TextField, MenuItem, Button, Typography, Box } from "@mui/material";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Condition, Category } from "../services/enums";
import { $Enums } from "@/app/generated/prisma";

async function createOffer(formData: FormData) {
  "use server";

  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    select: { id: true }
  });

  if (!user) {
    redirect("/login");
  }

  // Handle file uploads (stored in /public/uploads)
  const uploadedFiles = formData.getAll("pictures") as File[];
  const pictureUrls: string[] = [];
  console.log("Upload Files", uploadedFiles)

  for (const file of uploadedFiles) {
    if (!file || typeof file === "string") continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${randomUUID()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    pictureUrls.push(`/uploads/${fileName}`); // relative path for public access
  }

  await prisma.offer.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      pictures: pictureUrls,
      locationOfSeller: formData.get("locationOfSeller") as string,
      contact: formData.get("contact") as string,
      price: parseFloat(formData.get("price") as string),
      condition: (formData.get("condition") as Condition).toUpperCase() as $Enums.Condition,
      category: (formData.get("category") as Category).toUpperCase() as $Enums.Category,

      userId: user.id
    }
  });

  revalidatePath("/");
  redirect("/");
}

function SubmitButton() {
  return (
    <Button type="submit" variant="contained">
      Create Listing!
    </Button>
  );
}

export default async function NewListingPage() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Create New Listing
      </Typography>
      <Box
        component="form"
        action={createOffer}
        encType="multipart/form-data" // important for file uploads
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField name="title" label="Title" required />
        <TextField name="description" label="Description" multiline rows={4} required />

        {/* File upload input */}
        <Button variant="outlined" component="label">
          Upload Pictures
          <input
            type="file"
            name="pictures"
            multiple
            accept="image/*"
            hidden
          />
        </Button>
        <Typography variant="caption">You can upload multiple images</Typography>

        <TextField name="locationOfSeller" label="Location of Seller" required />
        <TextField name="contact" label="Contact" required />
        <TextField name="price" label="Price" type="number" required />

        <TextField select name="condition" label="Condition" defaultValue={Condition.NEW}>
          <MenuItem value={Condition.NEW}>Novo</MenuItem>
          <MenuItem value={Condition.USED}>Korišćeno</MenuItem>
          <MenuItem value={Condition.LIKE_NEW}>Kao novo</MenuItem>
          <MenuItem value={Condition.HEAVILY_USED}>Jako korišćeno</MenuItem>
          <MenuItem value={Condition.BROKEN}>Slomljeno</MenuItem>
        </TextField>

        <TextField select name="category" label="Category" defaultValue={Category.AIRSOFT_GUN}>
          <MenuItem value={Category.AIRSOFT_GUN}>replike</MenuItem>
          <MenuItem value={Category.ACCESSORY}>rukohvati</MenuItem>
          <MenuItem value={Category.CLOTHING}>odeca</MenuItem>
          <MenuItem value={Category.GEAR}>oprema</MenuItem>
          <MenuItem value={Category.BATTERY}>baterije</MenuItem>
          <MenuItem value={Category.MAGAZINE}>magazini</MenuItem>
          <MenuItem value={Category.OPTICS}>optika</MenuItem>
          <MenuItem value={Category.PATCH}>zakrpe</MenuItem>
          <MenuItem value={Category.GAS}>gas</MenuItem>
          <MenuItem value={Category.PART}>delovi</MenuItem>
          <MenuItem value={Category.OTHER}>ostalo</MenuItem>
        </TextField>

        <SubmitButton />
      </Box>
    </Container>
  );
}
