import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth"; // adjust for your auth
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Container, TextField, MenuItem, Button, Typography, Box } from "@mui/material";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

enum Condition {
  NEW = "NEW",
  USED = "USED"
}

enum Category {
  AIRSOFT_GUN = "AIRSOFT_GUN",
  ACCESSORY = "ACCESSORY",
  CLOTHING = "CLOTHING",
  GEAR = "GEAR",
  BATTERY = "BATTERY",
  MAGAZINE = "MAGAZINE",
  OPTICS = "OPTICS",
  PATCH = "PATCH",
  GAS = "GAS",
  PART = "PART",
  OTHER = "OTHER"
}

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
      condition: formData.get("condition") as Condition,
      category: formData.get("category") as Category,
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
          {Object.values(Condition).map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <TextField select name="category" label="Category" defaultValue={Category.AIRSOFT_GUN}>
          {Object.values(Category).map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <SubmitButton />
      </Box>
    </Container>
  );
}
