import { Button, Modal} from 'react-bootstrap';

const InstructionsModal = ({isOpen, closeModal}) => {
    // @todo Have to change the video link after willie provided the same
    return (
        <div>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>IndexUSD+ Instructions</Modal.Header>
                <Modal.Body>
                    <iframe width="1000" height="500" src="https://www.youtube.com/embed/2yF06msz7L8?autoplay=1"
                                            title="YouTube video player" frameBorder="0"
                                            allow="autoplay; encrypted-media; gyroscope;"
                                            allowFullScreen/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default InstructionsModal;
