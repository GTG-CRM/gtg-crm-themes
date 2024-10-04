import React, { useState } from 'react';
import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';
import copy from 'copy-to-clipboard';
import { Layout, Switch, Button, Modal, Input, message } from 'antd';

const { Header } = Layout;
const { TextArea } = Input;

export const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [stateToLoad, setStateToLoad] = useState<string | null>(null);

  const handleCopyState = () => {
    const json = query.serialize();
    copy(lz.encodeBase64(lz.compress(json)));
    message.success('State copied to clipboard');
  };

  const handleLoadState = () => {
    setDialogOpen(false);
    if (stateToLoad) {
      const json = lz.decompress(lz.decodeBase64(stateToLoad));
      console.log({ stateToLoad, json, actions });
      actions.deserialize(json);
      message.success('State loaded');
    }
  };

  return (
    <Header style={{ background: '#cbe8e7', padding: '0 16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Switch
          checked={enabled}
          onChange={(value) =>
            actions.setOptions((options) => (options.enabled = value))
          }
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
        />
        <div>
          <Button
            type="default"
            onClick={handleCopyState}
            style={{ marginRight: 8 }}
          >
            Copy current state
          </Button>
          <Button type="default" onClick={() => setDialogOpen(true)}>
            Load
          </Button>
        </div>
      </div>
      <Modal
        title="Load state"
        visible={dialogOpen}
        onCancel={() => setDialogOpen(false)}
        onOk={handleLoadState}
      >
        <TextArea
          rows={4}
          placeholder='Paste the contents that was copied from the "Copy Current State" button'
          value={stateToLoad || ''}
          onChange={(e) => setStateToLoad(e.target.value)}
        />
      </Modal>
    </Header>
  );
};
