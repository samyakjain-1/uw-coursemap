<script lang="ts">
  import { cn } from "$lib/utils.js";

  interface Props {
    class?: string | undefined | null;
    children?: import("svelte").Snippet;
    [key: string]: any;
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<h1
  class={cn(
    "text-center text-4xl leading-tight font-bold tracking-tighter md:text-6xl lg:text-6xl",
    className,
  )}
  {...rest}
>
  {@render children?.()}
</h1>
