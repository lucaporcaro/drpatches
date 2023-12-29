import { getUser } from "@app/actions/user";
import Input from "@app/components/Input";

export default async function ProfilePage() {
  const user = await getUser();
  return (
    <div className="w-full h-max flex flex-col items-start justify-start gap-4 p-8">
      <h2 className="font-bold text-2xl">Personal Information</h2>
      <form className="w-full h-max">
        <Input
          label="First Name"
          name="firstName"
          defaultValue={user.firstName}
        />
        <Input label="Last Name" name="lastName" defaultValue={user.lastName} />
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={user.lastName}
        />
      </form>
    </div>
  );
}
