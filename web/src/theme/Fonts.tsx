import { Global } from '@emotion/react'

export const Fonts = () => (
    <Global
        styles={`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&family=Roboto:wght@100;300;400;500;700;900&display=swap');

       ::-webkit-scrollbar-thumb:window-inactive {

        }

       ::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background-color: rgba(0, 0, 0, 0.3);
          // border: 1px solid #60606099;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #606060;
          outline: 1px solid slategrey;
        }
      `}
    />
)
