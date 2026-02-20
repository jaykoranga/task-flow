import { useTheme } from "../../context/ThemeContext";
import {
  lightModalTheme,
  darkModalTheme,
} from "../../constants/themeConstants/confirmModalThemeConstants";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  const { theme } = useTheme();
  const styles = theme === "dark" ? darkModalTheme : lightModalTheme;

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Close Button */}
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>

        {/* Content */}
        <h2 className={styles.title}>Are you sure?</h2>
        <p className={styles.message}>
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>

          <button onClick={handleConfirm} className={styles.confirmButton}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
