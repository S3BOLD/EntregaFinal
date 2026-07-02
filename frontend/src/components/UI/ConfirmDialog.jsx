import { Modal } from './Modal';
import { Button } from './Button';

export function ConfirmDialog({ title = 'Confirmar exclusão', message, onCancel, onConfirm, loading }) {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      footer={
        <>
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            Excluir
          </Button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
