'use strict';

var classList = require('../class-list');

describe('classList', function () {
  beforeEach(function () {
    this.element = document.createElement('div');
  });

  describe('add', function () {
    it('adds the class to the element', function () {
      classList.add(this.element, 'added');

      expect(this.element.classList.contains('added')).to.be.true;
    });

    it('adds the class to the element without removing others', function () {
      this.element.classList.add('existing');

      classList.add(this.element, 'added');

      expect(this.element.classList.contains('added')).to.be.true;
      expect(this.element.classList.contains('existing')).to.be.true;
    });

    it('does not double-add the class', function () {
      var occurrences = 0;

      this.element.classList.add('existing');
      this.element.classList.add('added');

      classList.add(this.element, 'added');

      this.element.className.trim().split(/\s+/).forEach(function (classname) {
        if (classname === 'added') { occurrences++; }
      });

      expect(occurrences).to.equal(1);
      expect(this.element.classList.contains('existing')).to.be.true;
    });
  });

  describe('remove', function () {
    it('removes the class from the element', function () {
      this.element.classList.add('removed');

      classList.remove(this.element, 'removed');

      expect(this.element.classList.contains('removed')).to.be.false;
    });

    it('removes the class from the element without removing others', function () {
      this.element.classList.add('removed');
      this.element.classList.add('existing');

      classList.remove(this.element, 'removed');

      expect(this.element.classList.contains('removed')).to.be.false;
      expect(this.element.classList.contains('existing')).to.be.true;
    });

    it('removes all occurrences of the class', function () {
      var occurrences = 0;

      this.element.className = 'removed existing removed';

      classList.remove(this.element, 'removed');

      this.element.className.trim().split(/\s+/).forEach(function (classname) {
        if (classname === 'removed') { occurrences++; }
      });

      expect(occurrences).to.equal(0);
      expect(this.element.classList.contains('existing')).to.be.true;
    });
  });

  describe('toggle', function () {
    describe('adding=true', function () {
      it('adds the class to the element', function () {
        classList.toggle(this.element, 'added', true);

        expect(this.element.classList.contains('added')).to.be.true;
      });

      it('adds the class to the element without removing others', function () {
        this.element.classList.add('existing');

        classList.toggle(this.element, 'added', true);

        expect(this.element.classList.contains('added')).to.be.true;
        expect(this.element.classList.contains('existing')).to.be.true;
      });

      it('does not double-add the class', function () {
        var occurrences = 0;

        this.element.classList.add('existing');
        this.element.classList.add('added');

        classList.toggle(this.element, 'added', true);

        this.element.className.trim().split(/\s+/).forEach(function (classname) {
          if (classname === 'added') { occurrences++; }
        });

        expect(occurrences).to.equal(1);
        expect(this.element.classList.contains('existing')).to.be.true;
      });
    });

    describe('adding=false', function () {
      it('removes the class from the element', function () {
        this.element.classList.add('removed');

        classList.toggle(this.element, 'removed', false);

        expect(this.element.classList.contains('removed')).to.be.false;
      });

      it('removes the class from the element without removing others', function () {
        this.element.classList.add('removed');
        this.element.classList.add('existing');

        classList.toggle(this.element, 'removed', false);

        expect(this.element.classList.contains('removed')).to.be.false;
        expect(this.element.classList.contains('existing')).to.be.true;
      });

      it('removes all occurrences of the class', function () {
        var occurrences = 0;

        this.element.className = 'removed existing removed';

        classList.toggle(this.element, 'removed', false);

        this.element.className.trim().split(/\s+/).forEach(function (classname) {
          if (classname === 'removed') { occurrences++; }
        });

        expect(occurrences).to.equal(0);
        expect(this.element.classList.contains('existing')).to.be.true;
      });
    });
  });
});
