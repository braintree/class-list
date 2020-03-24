var classList = require('../class-list');

describe('classList', function () {
  let element;

  beforeEach(function () {
    element = document.createElement('div');
  });

  describe('add', function () {
    it('adds the class to the element', function () {
      classList.add(element, 'added');

      expect(element.classList.contains('added')).toBe(true);
    });

    it('adds the class to the element without removing others', function () {
      element.classList.add('existing');

      classList.add(element, 'added');

      expect(element.classList.contains('added')).toBe(true);
      expect(element.classList.contains('existing')).toBe(true);
    });

    it('does not double-add the class', function () {
      var occurrences = 0;

      element.classList.add('existing');
      element.classList.add('added');

      classList.add(element, 'added');

      element.className.trim().split(/\s+/).forEach(function (classname) {
        if (classname === 'added') { occurrences++; }
      });

      expect(occurrences).toBe(1);
      expect(element.classList.contains('existing')).toBe(true);
    });
  });

  describe('remove', function () {
    it('removes the class from the element', function () {
      element.classList.add('removed');

      classList.remove(element, 'removed');

      expect(element.classList.contains('removed')).toBe(false);
    });

    it('removes the class from the element without removing others', function () {
      element.classList.add('removed');
      element.classList.add('existing');

      classList.remove(element, 'removed');

      expect(element.classList.contains('removed')).toBe(false);
      expect(element.classList.contains('existing')).toBe(true);
    });

    it('removes all occurrences of the class', function () {
      var occurrences = 0;

      element.className = 'removed existing removed';

      classList.remove(element, 'removed');

      element.className.trim().split(/\s+/).forEach(function (classname) {
        if (classname === 'removed') { occurrences++; }
      });

      expect(occurrences).toBe(0);
      expect(element.classList.contains('existing')).toBe(true);
    });
  });

  describe('toggle', function () {
    describe('adding=true', function () {
      it('adds the class to the element', function () {
        classList.toggle(element, 'added', true);

        expect(element.classList.contains('added')).toBe(true);
      });

      it('adds the class to the element without removing others', function () {
        element.classList.add('existing');

        classList.toggle(element, 'added', true);

        expect(element.classList.contains('added')).toBe(true);
        expect(element.classList.contains('existing')).toBe(true);
      });

      it('does not double-add the class', function () {
        var occurrences = 0;

        element.classList.add('existing');
        element.classList.add('added');

        classList.toggle(element, 'added', true);

        element.className.trim().split(/\s+/).forEach(function (classname) {
          if (classname === 'added') { occurrences++; }
        });

        expect(occurrences).toBe(1);
        expect(element.classList.contains('existing')).toBe(true);
      });
    });

    describe('adding=false', function () {
      it('removes the class from the element', function () {
        element.classList.add('removed');

        classList.toggle(element, 'removed', false);

        expect(element.classList.contains('removed')).toBe(false);
      });

      it('removes the class from the element without removing others', function () {
        element.classList.add('removed');
        element.classList.add('existing');

        classList.toggle(element, 'removed', false);

        expect(element.classList.contains('removed')).toBe(false);
        expect(element.classList.contains('existing')).toBe(true);
      });

      it('removes all occurrences of the class', function () {
        var occurrences = 0;

        element.className = 'removed existing removed';

        classList.toggle(element, 'removed', false);

        element.className.trim().split(/\s+/).forEach(function (classname) {
          if (classname === 'removed') { occurrences++; }
        });

        expect(occurrences).toBe(0);
        expect(element.classList.contains('existing')).toBe(true);
      });
    });
  });
});
