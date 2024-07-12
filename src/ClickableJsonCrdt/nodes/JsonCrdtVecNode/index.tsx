import * as React from 'react';
import * as css from '../../../css';
import {useJsonCrdt} from '../../context';
import {NodeRef, nodeRef} from '../../NodeRef';
import {JsonCrdtRegion} from '../../JsonCrdtRegion';
import {JsonCrdtProperty} from '../../JsonCrdtProperty';
import {JsonCrdtObjectLayout} from '../../JsonCrdtObjectLayout';
import {useRerenderModel} from '../../hooks';
import type {VecNode} from 'json-joy/lib/json-crdt';
import {PushElement} from './PushElement';

export interface JsonCrdtVecNodeProps {
  node: NodeRef<VecNode>;
}

export const JsonCrdtVecNode: React.FC<JsonCrdtVecNodeProps> = ({node}) => {
  const {render} = useJsonCrdt();
  useRerenderModel();

  const entries: React.ReactNode[] = [];
  let i = 0;

  node.node.children((child) => {
    if (!child) return;
    entries.push(
      <span key={child.id.sid + '.' + child.id.time} className={css.line}>
        {render(nodeRef(child, node, String(i)))}
      </span>,
    );
    i++;
  });

  return (
    <JsonCrdtRegion node={node}>
      <JsonCrdtObjectLayout
        node={node}
        property={<JsonCrdtProperty node={node} />}
        collapsedView={!!entries.length && entries.length}
        brackets={['[', ']']}
        header={<span style={{opacity: 0.5, display: 'inline-block', margin: '0.25em 0 0 -0.3em'}}>→</span>}
      >
        {entries}
        <PushElement node={node} />
      </JsonCrdtObjectLayout>
    </JsonCrdtRegion>
  );
};
