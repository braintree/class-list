import { add, remove, toggle } from "../class-list";

describe("classList", () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement("div");
  });

  describe("add", () => {
    it("adds the class to the element", () => {
      add(element, "added");

      expect(element.classList.contains("added")).toBe(true);
    });

    it("adds the class to the element without removing others", () => {
      element.classList.add("existing");

      add(element, "added");

      expect(element.classList.contains("added")).toBe(true);
      expect(element.classList.contains("existing")).toBe(true);
    });

    it("does not double-add the class", () => {
      let occurrences = 0;

      element.classList.add("existing");
      element.classList.add("added");

      add(element, "added");

      element.className
        .trim()
        .split(/\s+/)
        .forEach((classname) => {
          if (classname === "added") {
            occurrences++;
          }
        });

      expect(occurrences).toBe(1);
      expect(element.classList.contains("existing")).toBe(true);
    });
  });

  describe("remove", () => {
    it("removes the class from the element", () => {
      element.classList.add("removed");

      remove(element, "removed");

      expect(element.classList.contains("removed")).toBe(false);
    });

    it("removes the class from the element without removing others", () => {
      element.classList.add("removed");
      element.classList.add("existing");

      remove(element, "removed");

      expect(element.classList.contains("removed")).toBe(false);
      expect(element.classList.contains("existing")).toBe(true);
    });

    it("removes all occurrences of the class", () => {
      let occurrences = 0;

      element.className = "removed existing removed";

      remove(element, "removed");

      element.className
        .trim()
        .split(/\s+/)
        .forEach((classname) => {
          if (classname === "removed") {
            occurrences++;
          }
        });

      expect(occurrences).toBe(0);
      expect(element.classList.contains("existing")).toBe(true);
    });
  });

  describe("toggle", () => {
    describe("adding=true", () => {
      it("adds the class to the element", () => {
        toggle(element, "added", true);

        expect(element.classList.contains("added")).toBe(true);
      });

      it("adds the class to the element without removing others", () => {
        element.classList.add("existing");

        toggle(element, "added", true);

        expect(element.classList.contains("added")).toBe(true);
        expect(element.classList.contains("existing")).toBe(true);
      });

      it("does not double-add the class", () => {
        let occurrences = 0;

        element.classList.add("existing");
        element.classList.add("added");

        toggle(element, "added", true);

        element.className
          .trim()
          .split(/\s+/)
          .forEach((classname) => {
            if (classname === "added") {
              occurrences++;
            }
          });

        expect(occurrences).toBe(1);
        expect(element.classList.contains("existing")).toBe(true);
      });
    });

    describe("adding=false", () => {
      it("removes the class from the element", () => {
        element.classList.add("removed");

        toggle(element, "removed", false);

        expect(element.classList.contains("removed")).toBe(false);
      });

      it("removes the class from the element without removing others", () => {
        element.classList.add("removed");
        element.classList.add("existing");

        toggle(element, "removed", false);

        expect(element.classList.contains("removed")).toBe(false);
        expect(element.classList.contains("existing")).toBe(true);
      });

      it("removes all occurrences of the class", () => {
        let occurrences = 0;

        element.className = "removed existing removed";

        toggle(element, "removed", false);

        element.className
          .trim()
          .split(/\s+/)
          .forEach((classname) => {
            if (classname === "removed") {
              occurrences++;
            }
          });

        expect(occurrences).toBe(0);
        expect(element.classList.contains("existing")).toBe(true);
      });
    });
  });
});
