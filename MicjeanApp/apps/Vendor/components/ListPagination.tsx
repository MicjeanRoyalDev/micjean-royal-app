import React from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useBreakpoint } from "~/hooks/useBreakpoint";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface ListPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

// --- MOBILE VIEW ---
function MobilePagination({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: ListPaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <View className="flex-row items-center justify-between w-full px-4 py-2">
      <Pressable
        onPress={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious || isLoading}
        className="p-2 rounded-md active:bg-accent"
      >
        <ChevronLeft
          size={24}
          className={
            canGoPrevious && !isLoading
              ? "text-foreground"
              : "text-muted-foreground/50"
          }
        />
      </Pressable>

      <Text className="font-semibold text-muted-foreground">
        Page {currentPage} of {totalPages}
      </Text>

      <Pressable
        onPress={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext || isLoading}
        className="p-2 rounded-md active:bg-accent"
      >
        <ChevronRight
          size={24}
          className={
            canGoNext && !isLoading
              ? "text-foreground"
              : "text-muted-foreground/50"
          }
        />
      </Pressable>
    </View>
  );
}

// --- TABLET VIEW ---
function TabletPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: ListPaginationProps) {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <View className="flex-row items-center justify-between w-full px-6 py-2 border-t border-border">
      {/* Left Side: Summary */}
      <Text className="text-sm text-muted-foreground">
        Showing{" "}
        <Text className="font-semibold text-foreground">
          {startItem}-{endItem}
        </Text>{" "}
        of <Text className="font-semibold text-foreground">{totalItems}</Text>{" "}
        items
      </Text>

      {/* Right Side: Controls */}
      <View className="flex-row items-center gap-x-6">
        {/* Page Size Selector */}
        <View className="flex-row items-center gap-x-2">
          <Text className="text-sm text-muted-foreground">Rows per page:</Text>
          <Select
            value={{ label: pageSize.toString(), value: pageSize.toString() }}
            onValueChange={(option) => onPageSizeChange(Number(option?.value))}
            disabled={isLoading}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10" label="10">
                10
              </SelectItem>
              <SelectItem value="15" label="15">
                15
              </SelectItem>
              <SelectItem value="20" label="20">
                20
              </SelectItem>
            </SelectContent>
          </Select>
        </View>

        {/* Page Navigation */}
        <View className="flex-row items-center gap-x-2">
          <Text className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </Text>
          <Pressable
            onPress={() => onPageChange(currentPage - 1)}
            disabled={!canGoPrevious || isLoading}
            className="p-2 rounded-md active:bg-accent"
          >
            <ChevronLeft
              size={20}
              className={
                canGoPrevious && !isLoading
                  ? "text-foreground"
                  : "text-muted-foreground/50"
              }
            />
          </Pressable>
          <Pressable
            onPress={() => onPageChange(currentPage + 1)}
            disabled={!canGoNext || isLoading}
            className="p-2 rounded-md active:bg-accent"
          >
            <ChevronRight
              size={20}
              className={
                canGoNext && !isLoading
                  ? "text-foreground"
                  : "text-muted-foreground/50"
              }
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// --- MAIN EXPORTED COMPONENT ---
export function ListPagination(props: ListPaginationProps) {
  const { isLargeScreen } = useBreakpoint();

  if (props.totalPages <= 1) {
    return null;
  }

  return isLargeScreen ? (
    <TabletPagination {...props} />
  ) : (
    <MobilePagination {...props} />
  );
}
