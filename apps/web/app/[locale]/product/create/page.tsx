import SelectProductType from "@app/components/CreateProduct/SelectProductType";
export default function CreateProduct() {
  return (
    <div className="w-full h-max flex-auto py-10 flex flex-col items-center justify-center">
      <SelectProductType />
    </div>
  );
}
