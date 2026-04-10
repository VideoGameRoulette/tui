#!/usr/bin/env python3
import argparse


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate component task checklist.")
    parser.add_argument("--name", required=True, help="Component name")
    parser.add_argument("--url", required=True, help="Tailwind reference URL")
    args = parser.parse_args()

    print(f"# Component Task: {args.name}\n")
    print(f"Reference: {args.url}\n")
    print("## Build Checklist")
    print("- [ ] Implement TypeScript component shell")
    print("- [ ] Recreate Tailwind visual styling with MUI")
    print("- [ ] Match interaction states (hover/focus/active/disabled)")
    print("- [ ] Match responsive behavior")
    print("- [ ] Validate accessibility semantics")
    print("- [ ] Prepare JavaScript parity task")


if __name__ == "__main__":
    main()
