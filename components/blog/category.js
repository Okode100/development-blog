import Link from "next/link";
import Label from "@/components/ui/label";

export default function CategoryLabel({
  categories,
  nomargin = false
}) {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-200",
      green: "bg-success/10 text-success hover:bg-success/20 dark:bg-success/20 dark:text-success",
      amber: "bg-accent-100 text-accent-800 hover:bg-accent-200 dark:bg-accent-900 dark:text-accent-200",
      red: "bg-error/10 text-error hover:bg-error/20 dark:bg-error/20 dark:text-error",
      purple: "bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-200",
      default: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200"
    };
    return colorMap[color] || colorMap.default;
  };

  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link
            href={`/category/${category.slug.current}`}
            key={index}
            className="transition-colors duration-200">
            <Label 
              nomargin={nomargin} 
              color={category.color}
              className={getColorClasses(category.color)}>
              {category.title}
            </Label>
          </Link>
        ))}
    </div>
  );
}
