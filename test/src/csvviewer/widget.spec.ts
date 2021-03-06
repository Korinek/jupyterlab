// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import expect = require('expect.js');

import {
  uuid
} from '@jupyterlab/coreutils';

import {
  ServiceManager
} from '@jupyterlab/services';

import {
  CSVModel
} from '@jupyterlab/csvviewer';

import {
  CSVViewer
} from '@jupyterlab/csvviewer';

import {
  Context, DocumentRegistry, TextModelFactory
} from '@jupyterlab/docregistry';

import {
  CSV_DATA
} from './data.csv';


function createContext(): Context<DocumentRegistry.IModel> {
  let factory = new TextModelFactory();
  let manager = new ServiceManager();
  let path = uuid() + '.csv';
  return new Context({ factory, manager, path });
}


describe('csvviewer/widget', () => {

  const context = createContext();

  describe('CSVViewer', () => {

    describe('#constructor()', () => {

      it('should instantiate a `CSVViewer`', () => {
        let widget = new CSVViewer({ context });
        expect(widget).to.be.a(CSVViewer);
        widget.dispose();
      });

      it('should set a max exceeded listener on its warning area', done => {
        let widget = new CSVViewer({ context });
        let warning = widget.node.querySelector('.jp-CSVViewer-warning');
        expect(warning).to.be.ok();
        expect(warning.innerHTML).to.be.empty();
        widget.model.content = CSV_DATA;
        requestAnimationFrame(() => {
          expect(warning.innerHTML).to.not.be.empty();
          widget.dispose();
          done();
        });
      });

    });

    describe('#model', () => {

      it('should be a `CSVModel`', () => {
        let widget = new CSVViewer({ context });
        expect(widget.model).to.be.a(CSVModel);
        widget.dispose();
      });

    });

    describe('#dispose()', () => {

      it('should dispose of the resources held by the widget', () => {
        let widget = new CSVViewer({ context });
        expect(widget.isDisposed).to.be(false);
        expect(widget.model).to.be.ok();
        widget.dispose();
        expect(widget.isDisposed).to.be(true);
        expect(widget.model).to.not.be.ok();
      });

      it('should be safe to call multiple times', () => {
        let widget = new CSVViewer({ context });
        expect(widget.isDisposed).to.be(false);
        expect(widget.model).to.be.ok();
        widget.dispose();
        widget.dispose();
        expect(widget.isDisposed).to.be(true);
        expect(widget.model).to.not.be.ok();
      });

    });

  });

});
